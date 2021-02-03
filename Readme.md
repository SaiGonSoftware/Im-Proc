# Driver License Image Processing

## Development guidelines

### Backend: Python

For backend we are using Python. To setup Python project follow these step below

- Make sure you have lastest version of [Python](https://www.python.org/downloads/) 3 installed.
- After installed Python create virtual environment using these commands

```python
pip install virtual env
python -m venv dlp
dlp\Scripts\activate.bat
pip freeze > requirements.txt // only run this if we install new python package
pip install -r requirements.txt
```

- To run server with python make sure you are in backend folder and use the following commands

```python
dlp\Scripts\activate.bat
python server.py
```

### Frontend: NextJS

Make sure to have LTS version of [NodeJS](https://nodejs.org/) installed.

Run `npm install` inside frontend folder
