import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///education_platform.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GIGACHAT_CREDENTIALS = os.getenv('MDE5YTAyOTgtYmY4Zi03YjcxLWFjNzktMmI4YjBkY2Q4MTM2OjJlMDU3MzNiLWQyYjQtNDNhZi1iMzI3LTFiZjI5ZGJkNWE1ZQ==')
