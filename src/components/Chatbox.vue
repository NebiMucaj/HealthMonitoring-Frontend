
  
<template>
  <div >
      <Chat class="chat" v-if="visible"
        :participants="participants"
        :myself="myself"
        :messages="messages"
        :chat-title="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        :border-style="borderStyle"
        :hide-close-button="hideCloseButton"
        :close-button-icon-size="closeButtonIconSize"
        :submit-icon-size="submitIconSize"
        :async-mode="asyncMode"
        :scroll-bottom="scrollBottom"
        :display-header="true"
        :send-images="false"
        :profile-picture-config="profilePictureConfig"
        @onImageClicked="onImageClicked"
        @onImageSelected="onImageSelected"
        @onMessageSubmit="onMessageSubmit"
        @onType="onType"
        @onClose="onClose"/>
        
        

   </div>
</template>


<script>
import {Chat} from 'vue-quick-chat';
import 'vue-quick-chat/dist/vue-quick-chat.css';

export default {

    props:{
        isDoctor:Boolean,
        doctorID:String,
        doctorName:String,
        patientID:String,
        patientName:String,
    },
    created:function(){
     this.getMessages()
     if(this.isDoctor=='true') {
         this.myself.name=this.doctorName
         this.participants[0].name=this.patientName

     }else{
        this.myself.name=this.patientName
    
        this.participants[0].name=this.doctorName
        
     }
    },watch:{
        doctorName:function(val){
            this.myself.name=val
        }
    },
    components: {
        Chat
    },
    data() {
        return {
            interval:null,
            messages:[],
            visible: true,
            participants: [
                {
                    name: '',
                id: 2,
                profilePicture: 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png'
             
                },
               
            ],
            myself: {
              name: '',
                    id: 1,
                    profilePicture:'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png'
            },
        
            chatTitle: 'Chat',
            placeholder: 'send your message',
            colors: {
                header: {
                    bg: '#0275d8',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: '#1E90FF',
                        text: '#fff'
                    },
                    others: {
                        bg: '#836FFF',
                        text: '#fff'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#1874CD',
               
            },
            borderStyle: {
                topLeft: "10px",
                topRight: "10px",
                bottomLeft: "10px",
                bottomRight: "10px",
            },
            hideCloseButton: false,
            submitIconSize: 25,
            closeButtonIconSize: "20px",
            asyncMode: false,
            scrollBottom: {
                messageSent: true,
                messageReceived: false
            },
            displayHeader:true,
            profilePictureConfig: {
                others: true,
                myself: true,
                styles: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                }
            }
        }
    },

    methods: {
        getMessages:function(){
            
        const self=this;     
            
      setInterval(function () {fetch('http://localhost:5000/message/'+self.doctorID+'/'+self.patientID+'?isDoctor='+self.isDoctor.toString(),{
    method: 'GET',
    
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    
  
      })
  .then(response => response.json())
  .then(data => self.messages=data.messages)},3000);
        

        },
        onType: function (event) {
            console.log(event)
        },
        
        loadMoreMessages(resolve) {
            setInterval(() => {
                resolve(this.toLoad); //We end the loading state and add the messages
                //Make sure the loaded messages are also added to our local messages copy or they will be lost
                this.messages.unshift(...this.toLoad);
                this.toLoad = [];
            }, 3000);
        },
        onMessageSubmit: function (message) {
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */
            this.messages.push(message);
            var role=''
            if(this.isDoctor==='false') role=false
            else role=true
            
           fetch('http://localhost:5000/message/'+this.patientID, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             Authorization:'Bearer '+localStorage.getItem("jwt")
       

            },
            body: JSON.stringify({ message:message.content,timestamp:message.timestamp,patientIsReceiver:role,doctorID:this.doctorID
	
            })
         });
            setTimeout(() => {
                message.uploaded = true
            }, 2000)
        },
        onClose() {
            this.$emit('clicked')
        },
        onImageSelected(files, message){
            let src = 'https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg'
            this.messages.push(message);
            /**
             * This timeout simulates a requisition that uploads the image file to the server.
             * It's up to you implement the request and deal with the response in order to
             * update the message status and the message URL
             */
            setTimeout((res) => {
                message.uploaded = true
                message.src = res.src
            }, 3000, {src});
        },
        onImageClicked(message){
            /**
             * This is the callback function that is going to be executed when some image is clicked.
             * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
             */
            console.log('Image clicked', message.src)
        }
    },
    mounted () {
  this.getMessages()
  
}
 
   

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.chat{
  height: 500px;
}
</style>
