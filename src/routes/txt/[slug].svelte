<script>
    import { AppBar, ListItem, Menu, Icon, Snackbar, TextField, Textarea, Button, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify';
    import { mdiArrowLeft, mdiPlus, mdiDotsVertical } from '@mdi/js';
    import { txtdb, deleteTxt } from '../../scripts/db.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    import { onMount } from 'svelte';
    let snackbar = false;
    var sb_re = ""
    var title_ = "";
    var text_ = "";
    var docstxt = "";
    var pgid = $page.params.slug;
    //console.log(pgid)
    onMount(()=>{
        txtdb.get(pgid).then(function (doc) {
          // handle doc
          //console.log(doc)
          title_ = doc.title;
          text_ = doc.text;
        }).catch(function (err) {
          console.log(err);
        });
    });
    function update(ti_, tx_) {
      txtdb.get(pgid).then(function(doc) {
        doc.title = ti_;
        doc.text = tx_;
        return txtdb.put(doc)
      }).then(function(response) {
        //console.log(response.ok)
        snackbar = true;
        sb_re = "Saved!"
        return txtdb.get(pgid);
      }).catch(function (err) {
      sb_re = err;
        console.log(err);
      });
    };
    function rmTxt(){
        deleteTxt($page.params.slug);
        active = false;
        goto(`/`);
    };
    
    let active = false;
    
      function Dopen() {
        active = true;
      }
      function Dclose() {
        active = false;
      }
</script>

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
            <ListItem>Share</ListItem>
            <ListItem on:click={Dopen}>Delete</ListItem>
            
        </Menu>
</AppBar>

<div class="mt-16 ">
    <TextField filled placeholder="Title" bind:value={title_}></TextField>
    <Textarea filled placeholder="Content" autogrow bind:value={text_} rows={15} style="height: auto;"></Textarea>
    <Button block text on:click={() => update(title_, text_)}>Save</Button>
    <Snackbar class="flex-column" bind:active={snackbar} bottom center timeout={3000}>
      {sb_re}
      
    </Snackbar>
    <Dialog persistent bind:active>
      <Card>
        <CardTitle>Do you Agree?</CardTitle>
        <CardText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia deleniti natus
          dolore, rerum hic beatae officiis at ea sequi labore.
        </CardText>
        <CardActions>
          <Button on:click={Dclose} text>No</Button>
          <Button on:click={rmTxt} text class="red-text">Yes</Button>
        </CardActions>
      </Card>
    </Dialog>
</div>