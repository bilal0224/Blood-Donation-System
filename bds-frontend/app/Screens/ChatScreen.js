import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../firebase/firebase-config'

const ChatScreen = () => {
  const route = useRoute()
  const [loadind, setLoading] = useState(false)
  const [messages, setMessages] = useState([]);
  const requestData = route?.params?.currentUser
  const userDetails = route?.params?.item
  const currentUserid = requestData._id
  const uid = userDetails._id


  useEffect(() => {
    // getAllMessages()
    setLoading(true)
    const docid = uid > currentUserid ? currentUserid + "-" + uid : uid + "-" + currentUserid
    const messageRef = db.collection('chat')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', "desc")

    const unSubscribe = messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data()
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate()
          }
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date()
          }
        }

      })
      setMessages(allmsg)
    })


    return () => {
      unSubscribe()
    }

    setLoading(false)
  }, [])

  const onSend = (messageArray) => {
    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: currentUserid,
      sentTo: uid,
      createdAt: new Date(),
      user: {
        _id: currentUserid,
        avatar: 'https://placeimg.com/140/140/any',
      }
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    const docid = uid > currentUserid ? currentUserid + "-" + uid : uid + "-" + currentUserid

    db.collection('users').add({ sentBy: currentUserid, sentTo: uid })

    db.collection('chat')
      .doc(docid)
      .collection('messages')
      .add(mymsg)
    //  .add({...mymsg,createdAt:db.FieldValue.serverTimestamp()})
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showAvatarForEveryMessage={true}
      user={{
        _id: currentUserid,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});