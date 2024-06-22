from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import DateField, DateTimeField
from datetime import date
import pandas as pd

app = Flask(__name__)
app.secret_key = 'SHH!'


class DateForm(FlaskForm):
    datetime = DateTimeField('Pick a Date and Time')

markers = [
    {
        'nome': 'Praia Futuro',
        'lat': -3.7622,
        'lon': -38.4417,
        'filename': 'data/dados_horarios_estacao_praia-futuro_obs_20190101_20240618.csv',
    },
    {
        'nome': 'Itaperi',
        'lat': -3.7951,
        'lon': -38.5574,
        'filename': 'data/dados_horarios_estacao_fortaleza-itaperi_obs_20190101_20240618.csv',
    }
]

# Datepicker bounds will be set to the min and max date of all data
# This is useful to prevent the user from selecting a date that has no data
min_date = None
max_date = None

# For each station, load the data and find the min and max date
for marker in markers:
    marker['data'] = pd.read_csv(marker['filename'])
    marker['columns'] = [c for c in marker['data'].columns if c != 'Unnamed: 0']
    marker['data']['datetime'] = pd.to_datetime(marker['data']['Unnamed: 0'])

    if min_date is None or marker['data']['datetime'].min() < min_date:
        min_date = marker['data']['datetime'].min()
    
    if max_date is None or marker['data']['datetime'].max() > max_date:
        max_date = marker['data']['datetime'].max()

@app.route('/', methods=['get'])
def home():
    form = DateForm()
    # Get the filtered date from the URL, or default to today
    filtered_date = pd.to_datetime(request.args.get('datetime', date.today().isoformat()))
    # Set the default date in the form
    form.datetime.data = filtered_date

    # Filter the data for each marker, and create the popup content
    # If there is no data for the filtered date, add the marker to markers_without_data
    # This is necessary because the popup uses JS to format the reference datetime using the client locale,
    # meaning we can't create the entire popup HTML server-side
    markers_with_data = []
    markers_without_data = []
    for marker in markers:
        # Filter the data for the selected date (or the closest date before it)
        marker['filtered_data'] = marker['data'].loc[marker['data']['datetime'] <= filtered_date]
        if marker['filtered_data'].empty:
            markers_without_data.append(marker)
            marker['popup'] = '<h4 class="fs-5">Sem dados para esta data</h4>'
            continue
        
        marker['filtered_data'] = marker['filtered_data'].iloc[-1]
        # Save the datetime as a string, so we can format it client-side
        marker['filtered_data']['datetime'] = marker['filtered_data']['datetime'].isoformat()

        # Create the popup content using the columns that are active in the filters form
        marker['popup'] = f""
        for col in marker['columns']:
            # Check if this column is active in the filters
            if request.args.get(col) != 'on':
                continue

            marker['popup'] += f'<li class="fs-6">{col}: {marker["filtered_data"][col]}</li>'
        marker['popup'] = f'<nav style="--bs-breadcrumb-divider: \'\';" aria-label="breadcrumb"><ul>{marker["popup"]}</ul></nav>'
        
        markers_with_data.append(marker)

    return render_template('map.j2',
        form=form, markers_with_data=markers_with_data,
        markers_without_data=markers_without_data,
        data_columns=markers[0]['columns'], request_args=request.args,
        min_date=min_date, max_date=max_date
    )

if __name__ == '__main__':
    app.run(debug=True)