import React, {useState} from 'react';
import {SafeAreaView, Text, View, FlatList, StyleSheet} from 'react-native';
import music_data from './music-data.json';
import SongCard from './SongCard';
import SearchBar from './SearchBar';

function App() {
  const [list, setList] = useState(music_data); //başlangıç değeri music data'nın kendisi

  const renderSong = ({item}) => <SongCard song={item} />; //her bir item için fonksiyonu tekrardan oluşturmaması adına ayrı yazdık

  const renderSeperator = () => <View style={styles.seperator} />;

  const handleSearch = text => {
    const filteredList = music_data.filter(song => {
      const searchedText = text.toLowerCase();
      const currentTitle = song.title.toLowerCase();

      return currentTitle.indexOf(searchedText) > -1;
    });

    setList(filteredList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          data={list} // !
          renderItem={renderSong}
          ItemSeparatorComponent={renderSeperator}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  seperator: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default App;
