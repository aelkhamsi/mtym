#!/bin/bash

# Default values
EXT="jpg"
QUALITY=10

# Parse arguments
for arg in "$@"; do
  case $arg in
    --ext=*)
      EXT="${arg#*=}"   # strip '--ext='
      shift
      ;;
    --quality=*)
      QUALITY="${arg#*=}"  # strip '--quality='
      shift
      ;;
    *)
      ;;
  esac
done

# Loop through all files with the given extension
for img in *."$EXT"; do
  if [[ -f "$img" ]]; then
    # Remove extension and lowercase the base name
    base_name=$(basename "$img" ".$EXT")
    output_name=$(echo "$base_name" | tr '[:upper:]' '[:lower:]')

    # Convert to WebP
    cwebp -q "$QUALITY" "$img" -o "${output_name}.webp"
  fi
done
