#!/usr/bin/env bash
docker build -t execodex-fe:latest .
kind load docker-image execodex-fe:latest --name s4v3
kubectl apply -k k8s
kubectl rollout restart deployment/execodex-fe -n execodex
