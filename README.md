# npm-install-doist-todoist-mcp

## Install

```bash
npm install @doist/todoist-mcp @doist/todoist-sdk ai
```

## Use Todoist MCP tools with `streamText`

```ts
import { findTasksByDate, addTasks } from '@doist/todoist-mcp'
import { TodoistApi } from '@doist/todoist-sdk'
import { streamText } from 'ai'

// Create Todoist API client
const client = new TodoistApi(process.env.TODOIST_API_KEY)

// Helper to wrap tools with the client
function wrapTool(tool, todoistClient) {
  return {
    ...tool,
    execute(args) {
      return tool.execute(args, todoistClient)
    },
  }
}

const result = streamText({
  model: yourModel,
  system: 'You are a helpful Todoist assistant',
  tools: {
    findTasksByDate: wrapTool(findTasksByDate, client),
    addTasks: wrapTool(addTasks, client),
  },
})
```

## Run the MCP server

```bash
npx @doist/todoist-mcp
```

## Remote MCP server config

```json
{
  "mcpServers": {
    "todoist": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://ai.todoist.net/mcp"]
    }
  }
}
```

```bash
npx -y mcp-remote https://ai.todoist.net/mcp
```

## Plugin commands

```bash
/plugin marketplace add doist/todoist-mcp
/plugin install todoist@doist
```

## Claude MCP config

```bash
claude mcp add --transport http todoist https://ai.todoist.net/mcp
```

```json
{
  "servers": {
    "todoist": {
      "type": "http",
      "url": "https://ai.todoist.net/mcp"
    }
  }
}
```