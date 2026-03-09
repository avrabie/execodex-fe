#!/usr/bin/env bash
docker build --platform linux/amd64 -t gluonstream/execodex-fe:latest .
docker push gluonstream/execodex-fe:latest
kind load docker-image gluonstream/execodex-fe:latest --name s4v3
kubectl apply -k k8s
kubectl rollout restart deployment/execodex-fe -n execodex
