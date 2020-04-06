# MST monday.com pulse updater

This action adds update to a pulse on monday.com

## Inputs

### `monday-api-key`

**Required** monday.com API Key (Admin > API > API v2 Token > Personal API Token [Copy]). This parameter should be stored in the GitHub secrets.

### `monday-pulse-id`

**Required** monday.com pulse ID in which an update will be added. This parameter should be stored in the GitHub secrets.

### `monday-update-text`

**Required** Text which will be added as an update.

## Outputs

### `monday-update-id`

ID of the update created with this action.

## Example usage
```yaml
- name: Send update to monday.com pulse
  uses: team-mst/mst-monday-pulse-updater@v1
  with:
    monday-api-key: ${{ secrets.MONDAY_API_KEY }}
    monday-pulse-id: ${{ secrets.MONDAY_PULSE_ID }}
    monday-update-text: "Hello from the mst github action"
```