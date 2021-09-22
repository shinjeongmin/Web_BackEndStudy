echo backup
sudo aws s3 sync /var/lib/postgresql/12/. s3://postgres-db-test