import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import axios from 'axios';

const MessagesPage = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ content: '', recipientEmail: '' });
    const [recipientId, setRecipientId] = useState(null);
    const [error, setError] = useState('');
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get(`/api/messages/discussions/${userId}`);
                setDiscussions(response.data);
            } catch (error) {
                console.error('Error fetching discussions', error);
            }
        };

        fetchDiscussions();
    }, [userId]);

    useEffect(() => {
        if (selectedDiscussion) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(`/api/messages/conversation/${userId}/${selectedDiscussion.id}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching messages', error);
                }
            };

            fetchMessages();
        }
    }, [selectedDiscussion, userId]);

    const handleSendMessage = async () => {
        if (!recipientId) {
            setError('Please enter a valid recipient email');
            return;
        }

        try {
            await axios.post('/api/messages/send', {
                senderId: userId,
                recipientId: recipientId,
                content: newMessage.content
            });
            setNewMessage({ content: '', recipientEmail: '' });
            setRecipientId(null);
            // Fetch messages again to update the list
            if (selectedDiscussion) {
                const response = await axios.get(`/api/messages/conversation/${userId}/${selectedDiscussion.id}`);
                setMessages(response.data);
            }
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    const handleRecipientEmailChange = async (e) => {
        const recipientEmail = e.target.value;
        setNewMessage({ ...newMessage, recipientEmail });
        try {
            const response = await axios.get(`/api/users/findByEmail?email=${recipientEmail}`);
            if (response.data) {
                setRecipientId(response.data.id);
                setError('');
            } else {
                setRecipientId(null);
                setError('User not found');
            }
        } catch (error) {
            console.error('Error fetching recipient', error);
            setRecipientId(null);
            setError('Error fetching recipient');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: 4 }}>
                <Box sx={{ width: '30%', padding: 2 }}>
                    <Typography variant="h4" gutterBottom>Discussions</Typography>
                    <List>
                        {discussions.map((discussion) => (
                            <ListItem
                                key={discussion.id}
                                button
                                onClick={() => setSelectedDiscussion(discussion)}
                                selected={selectedDiscussion && selectedDiscussion.id === discussion.id}
                            >
                                <ListItemText
                                    primary={`${discussion.recipient.firstName} ${discussion.recipient.lastName}`}
                                    secondary={discussion.lastMessageContent}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ width: '70%', padding: 2 }}>
                    {selectedDiscussion && (
                        <>
                            <Typography variant="h4" gutterBottom>Conversation</Typography>
                            <List>
                                {messages.map((message) => (
                                    <ListItem key={message.id}>
                                        <ListItemText
                                            primary={`${message.sender.firstName} ${message.sender.lastName}`}
                                            secondary={message.content}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6" gutterBottom>Send a new message</Typography>
                        <TextField
                            label="Recipient Email"
                            value={newMessage.recipientEmail}
                            onChange={handleRecipientEmailChange}
                            fullWidth
                            margin="normal"
                            error={!!error}
                            helperText={error}
                        />
                        <TextField
                            label="Message"
                            value={newMessage.content}
                            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                            fullWidth
                            margin="normal"
                            multiline
                        />
                        <Button variant="contained" color="primary" onClick={handleSendMessage}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default MessagesPage;
