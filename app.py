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

for marker in markers:
    marker['data'] = pd.read_csv(marker['filename'])
    marker['columns'] = [c for c in marker['data'].columns if c != 'Unnamed: 0']
    marker['data']['datetime'] = pd.to_datetime(marker['data']['Unnamed: 0'])

@app.route('/', methods=['post','get'])
def home():
    form = DateForm()
    filtered_date = pd.to_datetime(request.args.get('datetime', date.today().isoformat()))
    form.datetime.data = filtered_date

    for marker in markers:
        marker['filtered_data'] = marker['data'].loc[marker['data']['datetime'] < filtered_date].iloc[-1]
        marker['filtered_data']['datetime'] = marker['filtered_data']['datetime'].isoformat()
          # TODO: Inject JS to format Datetime with Browser's locale
        marker['popup'] = f"<h4>Referência: {marker['filtered_data']['datetime']}</h4><hr>"
        for col in marker['columns']:
            # Check if this column is active in the filters
            if request.args.get(col) != 'on':
                continue

            marker['popup'] += f'{col}: {marker["filtered_data"][col]}<hr>'
        marker['popup'] = marker['popup'][:-4]

    return render_template('map2.j2', form=form, markers=markers, data_columns=markers[0]['columns'], request_args=request.args)

if __name__ == '__main__':
    app.run(debug=True)