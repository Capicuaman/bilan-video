#!/bin/bash
# Batch render script for bilan TikTok videos
# Usage: ./scripts/render-batch.sh [video_id]
# Examples:
#   ./scripts/render-batch.sh        # Render all videos
#   ./scripts/render-batch.sh 01     # Render only video 01
#   ./scripts/render-batch.sh 05 09  # Render videos 05 and 09

set -e

# Configuration
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATA_FILE="$PROJECT_DIR/data/videos-batch-01.json"
OUTPUT_DIR="$PROJECT_DIR/out/batch-01"
LOG_FILE="$PROJECT_DIR/out/render-log.txt"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Start log
echo "=== Batch Render Started: $(date) ===" >> "$LOG_FILE"

# Function to render a single video
render_video() {
    local id="$1"
    local filename="$2"
    local template="$3"
    local props="$4"
    
    echo -e "${YELLOW}Rendering video $id: $filename${NC}"
    echo "  Template: $template"
    echo "  Output: $OUTPUT_DIR/$filename.mp4"
    
    start_time=$(date +%s)
    
    cd "$PROJECT_DIR"
    npx remotion render src/index.ts "$template" "$OUTPUT_DIR/$filename.mp4" \
        --props="$props" \
        2>&1 | tee -a "$LOG_FILE"
    
    end_time=$(date +%s)
    duration=$((end_time - start_time))
    
    echo -e "${GREEN}✓ Completed $filename in ${duration}s${NC}"
    echo "Completed $filename in ${duration}s" >> "$LOG_FILE"
    echo ""
}

# Parse videos from JSON and render
echo -e "${GREEN}=== bilan Batch Video Renderer ===${NC}"
echo "Project: $PROJECT_DIR"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if specific video IDs were provided
if [ $# -gt 0 ]; then
    # Render specific videos
    for vid_id in "$@"; do
        video=$(jq -r ".videos[] | select(.id == \"$vid_id\")" "$DATA_FILE")
        if [ -n "$video" ] && [ "$video" != "null" ]; then
            filename=$(echo "$video" | jq -r '.filename')
            template=$(echo "$video" | jq -r '.template')
            props=$(echo "$video" | jq -c '.props')
            render_video "$vid_id" "$filename" "$template" "$props"
        else
            echo -e "${RED}Video ID $vid_id not found${NC}"
        fi
    done
else
    # Render all videos
    total=$(jq '.videos | length' "$DATA_FILE")
    echo "Rendering $total videos..."
    echo ""
    
    for i in $(seq 0 $((total - 1))); do
        video=$(jq ".videos[$i]" "$DATA_FILE")
        id=$(echo "$video" | jq -r '.id')
        filename=$(echo "$video" | jq -r '.filename')
        template=$(echo "$video" | jq -r '.template')
        props=$(echo "$video" | jq -c '.props')
        
        echo -e "${YELLOW}[$((i + 1))/$total]${NC}"
        render_video "$id" "$filename" "$template" "$props"
    done
fi

echo ""
echo -e "${GREEN}=== Batch Render Complete ===${NC}"
echo "Output files in: $OUTPUT_DIR"
echo ""
ls -lh "$OUTPUT_DIR"/*.mp4 2>/dev/null || echo "No MP4 files found"

echo "=== Batch Render Finished: $(date) ===" >> "$LOG_FILE"
