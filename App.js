import React, { useEffect, useState } from 'react';
import { View, Linking, Text, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    // Import the JSON file
    const json = require('./db.json');

    // Access the data from the JSON file
    setJsonData(json.data);

    // Extract the link URL from the JSON data
    const linkMatch = json.data.match(/href=['"](https:\/\/[^'"]+)['"]/i);
    if (linkMatch) {
      setLinkUrl(linkMatch[1]);
      console.log('link is', linkUrl)
    }
  }, []);

  const handleLinkPress = () => {
    if (linkUrl) {
      Linking.openURL(linkUrl); // Open the URL in the default browser or app
    }
  };

  const renderTextWithLink = () => {
    // Remove HTML tags using a regular expression
    const textWithoutTags = jsonData.replace(/<\/?[^>]+(>|$)/g, '');

    // Split the text based on the "facebook" link
    const parts = textWithoutTags.split('facebook');

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{parts[0]}</Text>
        {parts.length > 1 && (
          <>
            <Text
              style={styles.link}
              onPress={handleLinkPress}>
              facebook
            </Text>
            <Text style={styles.text}>{parts[1]}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {jsonData ? renderTextWithLink() : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 5,      // Add spacing between text and link
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;
