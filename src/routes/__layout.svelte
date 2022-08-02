<script>
  import { AppBar, Button, Icon, Menu, ListItem, MaterialApp } from 'svelte-materialify';
  import { mdiArrowLeft, mdiPlus, mdiDotsVertical } from '@mdi/js';
  import { getStores, page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { addText } from '../scripts/db.js'
  function newTxtR() {
    var id = new Date().toISOString();
    var title = "";
    var text = "";
    addText(id, title, text);
    goto(`/txt/${id}`);
}
</script>

<MaterialApp>
    {#if $page.url.pathname == "/"}
        <AppBar fixed flat style="width:100%;">
          <span slot="title">Title</span>
          <div style="flex-grow:1" />
          <Button fab depressed on:click={newTxtR}>
            <Icon path={mdiPlus} />
          </Button>
          <Menu right>
            <div slot="activator">
              <Button fab depressed>
                <Icon path={mdiDotsVertical} />
              </Button>
            </div>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
          </Menu>
        </AppBar>
    {:else if $page.url.pathname != "/"}
        <AppBar fixed flat style="width:100%;">
            <div slot="icon">
                <Button fab depressed>
                    <a href="../">
                        <Icon path={mdiArrowLeft} />
                    </a>
                </Button>
              </div>
              <div style="flex-grow:1" />
              <Menu right>
                <div slot="activator">
                  <Button fab depressed>
                    <Icon path={mdiDotsVertical} />
                  </Button>
                </div>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
                <ListItem>Item 3</ListItem>
              </Menu>
            </AppBar>
            
    {/if}
<slot></slot></MaterialApp>