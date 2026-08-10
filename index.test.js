import test from 'node:test'
import assert from 'node:assert/strict'

import { addTasks, createTodoistTools, findTasksByDate, wrapTodoistTool } from './index.js'

test('wrapTodoistTool passes the Todoist client to execute', async () => {
  const client = { key: 'client' }
  const tool = {
    name: 'example',
    async execute(args, receivedClient) {
      return { args, receivedClient }
    },
  }

  const wrappedTool = wrapTodoistTool(tool, client)
  const result = await wrappedTool.execute({ value: 1 })

  assert.deepEqual(result, {
    args: { value: 1 },
    receivedClient: client,
  })
})

test('createTodoistTools returns wrapped Todoist MCP tools', () => {
  const client = { key: 'client' }
  const tools = createTodoistTools(client)

  assert.equal(typeof tools.findTasksByDate.execute, 'function')
  assert.equal(typeof tools.addTasks.execute, 'function')
  assert.notEqual(tools.findTasksByDate.execute, findTasksByDate.execute)
  assert.notEqual(tools.addTasks.execute, addTasks.execute)
})
