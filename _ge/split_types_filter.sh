#!/usr/bin/env bash
set -euo pipefail

exceptions() {
    local input="${1:-}"
    if [[ -z "$input" ]]; then
        echo "Usage: exceptions <input>"
        return 1
    fi

    echo "Processing exceptions: $input"
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
    exceptions "$@"
}

main "$@"
