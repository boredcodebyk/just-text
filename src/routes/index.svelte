<script>
  import { AppBar, Button, Icon, Menu, ListItem, List, MaterialApp } from 'svelte-materialify';
  import { mdiPlus, mdiDotsVertical } from '@mdi/js';
  import { fetchedText, txtdb, showText} from '../scripts/db.js';
  import '../style.css';
  import { onMount } from 'svelte';
  var ft = fetchedText;
  onMount(() => {
    txtdb.allDocs({include_docs: true, descending: true}, function(err, doc) {
        ft = doc.rows;
      });
  })
  console.log(ft)
</script>
<svelte:head>
  <title>Welcome</title>
</svelte:head>

    <div class="mt-13">
        <List>
        {#each ft as cat}
            <a href="/txt/{cat.id}">
                <ListItem>{cat.doc.title}<span slot="subtitle">{(cat.doc.text).substring(0,52)}...</span></ListItem>
            </a>
        {/each}
        </List>
        <h1>Hello and welcome to my site!</h1>
    
        <a href="/about">About my site</a>
    
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    </div>

