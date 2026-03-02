#!/bin/bash
# Quick render a single video by ID
# Usage: ./scripts/render-one.sh 05

set -e

if [ -z "$1" ]; then
    echo "Usage: ./scripts/render-one.sh <video_id>"
    echo "Example: ./scripts/render-one.sh 05"
    exit 1
fi

./scripts/render-batch.sh "$1"
