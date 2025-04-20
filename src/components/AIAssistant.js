import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  IconButton, 
  Typography, 
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await fetch('http://localhost:5000/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      // Add bot response
      const botResponse = { text: data.message, isBot: true };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.", 
        isBot: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
      >
        <SendIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 350,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            AI Assistant
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                  padding: '4px 8px'
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    backgroundColor: message.isBot ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 64, 129, 0.1)',
                    borderRadius: 2,
                    border: message.isBot ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid rgba(255, 64, 129, 0.3)'
                  }}
                >
                  <ListItemText
                    primary={message.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        wordBreak: 'break-word',
                        fontFamily: "'Roboto', 'Open Sans', sans-serif",
                        fontSize: '0.95rem',
                        lineHeight: 1.5,
                        color: 'text.primary'
                      }
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
            {isLoading && (
              <ListItem sx={{ justifyContent: 'flex-start', padding: '4px 8px' }}>
                <CircularProgress size={20} color="primary" />
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              size="small"
              disabled={isLoading}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: "'Roboto', 'Open Sans', sans-serif",
                  fontSize: '0.9rem'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 215, 0, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 215, 0, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AIAssistant; 