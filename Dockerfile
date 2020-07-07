FROM python:3.7
ENV PYTHONBUFFERED 1

WORKDIR /server
ADD . /server/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN EXPOSE 8000
RUN EXPOSE 8080