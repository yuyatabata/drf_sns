FROM python:3.7
ENV PYTHONBUFFERED 1

WORKDIR /src/app
ADD requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 8000
