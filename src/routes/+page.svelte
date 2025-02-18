<script lang="ts">
    import { enhance } from '$app/forms';
    import { invalidate } from '$app/navigation';
    import { makeClient } from '$lib/api/make-client.js';

    const { data } = $props();
    const client = makeClient(fetch);

    let isLoading = $state(false);
    let taskName = $state('');

    async function handleActionClick(id: number, action: 'finish' | 'undo' | 'delete') {
        try {
            isLoading = true;
            if (action === 'finish') {
                await client.tasks[':id'].$patch({
                    param: { id },
                    json: { done: true }
                });
            } else if (action === 'undo') {
                await client.tasks[':id'].$patch({
                    param: { id },
                    json: { done: false }
                });
            } else if (action === 'delete') {
                await client.tasks[':id'].$delete({
                    param: { id }
                });
            }

            console.log('invalidating');
            await invalidate('app:tasks');
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
    }
</script>

<h1>BTMW: The best task manager in the world</h1>

<div>
    <h2>New Task</h2>
    <form method="POST" use:enhance>
        <input type="text" name="name" required bind:value={taskName} disabled={isLoading} autofocus />
        <button type="submit" disabled={isLoading}>Add</button>
    </form>
</div>

<div>
    <h2>My Tasks</h2>
    {#if data.tasks.length === 0}
        <p>You don't have any tasks! Be free little bird</p>
    {:else}
        <ul>
            {#each data.tasks as task (task.id)}
                <li>
                    {task.done ? '✅' : '⬛️'}
                    {task.name}
                    {#if !task.done}
                        <button type="button" onclick={() => handleActionClick(task.id, 'finish')}>Finish</button>
                    {:else}
                        <button type="button" onclick={() => handleActionClick(task.id, 'undo')}>Undo</button>
                        <button type="button" onclick={() => handleActionClick(task.id, 'delete')}>Delete</button>
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>