
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import { fetchUser } from '../apis/auth';
import { me } from '../apis/auth';
import { db } from '../firebase/firebase-config';

const MessagesScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [usersf, setUsersf] = useState([])
  const getMarkers = async () => {
    try {
      setLoading(true)
      const currUser = await me()
      const events = await db.collection('users')
      const tempDoc = []
      events.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().sentBy === currUser.data.user._id) {
            if (tempDoc.indexOf(doc.data().sentTo) === -1) { tempDoc.push(doc.data().sentTo) }
          }
          if (doc.data().sentTo === currUser.data.user._id) {
            if (tempDoc.indexOf(doc.data().sentBy) === -1) { tempDoc.push(doc.data().sentBy) }
          }

        }
        )
        tempDoc.map((id) => {
          // console.log(tempDoc)
          fetchUserDetails(id)
        })
      })

    } catch (error) {
      console.log("error in message screeen", error)
    } finally {
      setLoading(false)
    }
  }
  //  getMarkers()

  const fetchCurrentUser = async () => {
    try {
      const res = await me()
      setCurrentUser(res.data.user,
      )

    } catch (error) {
      console.log("error", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await users()
      setUsersf(res.data.users,
      )

    } catch (error) {
      console.log("error", error)
    }
  }

  const fetchUserDetails = async (userId) => {
    try {
      const res = await fetchUser(userId);
      setUser(old => [...old, res?.data?.user])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
    getMarkers()

  }, [])


  return (
    loading ? <Text>
      loading
    </Text> :
      <Container>
        <FlatList
          data={user}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate('ChatScreen', { currentUser, item })}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={require('../assets/users/chat.png')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.firstName + " " + item.lastName}</UserName>
                    {/* <PostTime>2 days ago</PostTime> */}
                  </UserInfoText>
                  {/* <MessageText>Hey there</MessageText> */}
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>

  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});