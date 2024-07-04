from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import DateField, DateTimeField
from datetime import date
import pandas as pd

app = Flask(__name__)
app.secret_key = 'SHH!'

data = pd.read_csv('data/ipece_com_info_cagece_v2.csv', delimiter=';')
data['cagece_sistema_de_abastecimento'].fillna('Não informado', inplace=True)
# for col in ['cagece_sistema_de_abastecimento','nm_mun','nm_dist', 'nm_localidade']:
#     data[col] = data[col].str.capitalize()
for idx, localidade in data.iterrows():
    # print(localidade['cagece_long_corrigido'])
    break

@app.route('/', methods=['get'])
def home():
    return render_template('map.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)