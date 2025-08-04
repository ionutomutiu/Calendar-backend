#!/bin/bash

# Detect OS
OS_TYPE="$(uname)"

if [[ "$OS_TYPE" == "Darwin" ]]; then
  echo "Running on macOS. Skipping data file initialization."
  exit 0
elif [[ "$OS_TYPE" =~ "MINGW" || "$OS_TYPE" =~ "MSYS" || "$OS_TYPE" =~ "CYGWIN" ]]; then
  echo "Running on Windows. Skipping data file initialization."
  exit 0
fi

DATA_DIR="/mnt/data"
DATA_FILE="$DATA_DIR/data.json"

# Check if the directory exists
if [ ! -d "$DATA_DIR" ]; then
  echo "Error: Directory $DATA_DIR does not exist. Did you mount a Render disk?"
  exit 1
fi

# Create the file if it doesn't exist
if [ ! -f "$DATA_FILE" ]; then
  echo "Creating $DATA_FILE..."
  echo "[]" > "$DATA_FILE"  # Use {} if you want an empty object
  echo "$DATA_FILE initialized."
else
  echo "$DATA_FILE already exists."
fi
