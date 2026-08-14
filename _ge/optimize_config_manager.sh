#!/usr/bin/env bash
set -euo pipefail

middleware() {
    local input="${1:-}"
    if [[ -z "$input" ]]; then
        echo "Usage: middleware <input>"
        return 1
    fi

    echo "Processing middleware: $input"
    # Validate
    if [[ ! -f "$input" ]]; then
        echo "Error: File not found" >&2
        return 1
    fi

    # Process
    local result=$(sanitize "$input")
    echo "$result"
}

main() {
    middleware "$@"
}

main "$@"
