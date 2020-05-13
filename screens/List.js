import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Clipboard,
} from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { Ionicons } from '@expo/vector-icons';
import { fontArray } from '../miniFonts';
import Hotshot from 'hotshot';
import { AntDesign } from '@expo/vector-icons';

const List = () => {
  const inputRef = useRef();
  const [query, setQuery] = useState('');
  const [listFonts, setListFonts] = useState([]);
  const [fontName, setFontName] = useState('');
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    setListFonts(getFontsForQuery(query.toLowerCase()));
    inputRef.current?.focus();
    hotshot;
  }, [query]);

  function getFontsForQuery(query) {
    return fontArray.filter((font) => {
      return font.fontName.toLowerCase().includes(query);
    });
  }

  const [handleOnChange] = useDebouncedCallback(
    (query) => setQuery(query),
    250
  );

  const hotshot = new Hotshot({
    combos: [
      {
        keyCodes: [191], // open search by pressing / key
        callback: () => setTimeout(() => inputRef.current?.focus(), 16),
      },
    ],
  });

  const removeScore = (word) => {
    return word.split('-').join('');
  };

  const IconRow = ({ item }) =>
    useMemo(() => {
      let loadImage = require(`../assets/font_images/${removeScore(
        item.fontName
      )}.png`);

      return (
        <TouchableOpacity
          style={styles.imageItem}
          onPress={() => {
            setFontName(item.fontName);
            setVariants(item.variants);
          }}>
          <Image style={styles.loadImage} source={loadImage} />
        </TouchableOpacity>
      );
    });

  const HowUseIt = ({ name, variants }) =>
    useMemo(() => {
      const list = variants.map((variant) => '\n  ' + variant);

      return (
        <View>
          <Text style={styles.fontInfoStyle}>
            Font name: <Text style={styles.fontname}>{name}</Text>{' '}
            <TouchableOpacity onPress={() => handleCopy(name)}>
              <Text style={styles.copyButton}>copy</Text>
            </TouchableOpacity>
          </Text>

          <Text
            style={
              styles.importStyle
            }>{`import { ${list} ${`\n`}} from '@expo-google-fonts/${name}'`}</Text>
        </View>
      );
    });

  const Info = () => {
    return (
      <View>
        <Text style={styles.titleUse}>Guide to install and use it:</Text>

        <Text
          accessibilityRole="link"
          href="https://github.com/expo/google-fonts"
          style={styles.infoStyle}
          target="_blank">
          Follow this link: @expo-google-fonts
        </Text>
      </View>
    );
  };

  const handleCopy = (fontName) => {
    Clipboard.setString(`expo install @expo-google-fonts/${fontName}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="md-search"
            size={30}
            color="#FFFFFF"
            style={styles.icon}
          />
          <TextInput
            key="stable"
            ref={inputRef}
            placeholder="Search for a font"
            placeholderTextColor="#CE93D8"
            onChangeText={handleOnChange}
            style={styles.input}
            selectTextOnFocus
          />
        </View>

        <Text style={styles.titleFontVariants}>Font and its variants</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <FlatList
          style={styles.flatStyle}
          data={listFonts}
          renderItem={({ item }) => <IconRow item={item} />}
          keyExtractor={(item) => `${item.fontName}`}
        />

        <View style={{ width: '60%', padding: 20 }}>
          {fontName.length !== 0 ? (
            <HowUseIt name={fontName} variants={variants} />
          ) : (
            <Info />
          )}
        </View>
        <View style={styles.aboutView}>
          <Text style={{ color: '#4A148C' }}>
            s.e. developed by AtilaDev -{' '}
          </Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
            accessibilityRole="link"
            href="https://twitter.com/FavreLeandro"
            target="_blank">
            <AntDesign name="twitter" size={20} color="#7B1FA2" />
            <Text style={styles.aboutTwitter}>@FavreLeandro</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
            accessibilityRole="link"
            href="https://github.com/AtilaDev"
            target="_blank">
            <AntDesign name="github" size={20} color="#7B1FA2" />
            <Text style={styles.aboutGithub}>github.com/AtilaDev</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#9C27B0',
    width: '40%',
  },
  input: {
    padding: 10,
    width: '100%',
    fontSize: 18,
    color: '#fff',
    outlineColor: '#9C27B0',
  },
  icon: {
    padding: 10,
  },
  flatStyle: {
    width: '40%',
    borderRightWidth: 1,
    borderRightColor: '#9C27B0',
  },
  infoStyle: {
    fontSize: 18,
    fontFamily: 'monospace',
  },
  imageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    height: 50,
    alignContent: 'center',
  },
  loadImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    marginRight: 20,
    paddingVertical: 20,
  },
  copyButton: {
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#7B1FA2',
    color: '#7B1FA2',
  },
  fontInfoStyle: {
    fontSize: 18,
    marginBottom: 20,
  },
  barBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B1FA2',
  },
  fontname: {
    fontWeight: '700',
  },
  titleUse: {
    fontSize: 20,
    marginBottom: 10,
  },
  importStyle: {
    fontSize: 16,
    fontFamily: 'monospace',
  },
  titleFontVariants: {
    color: '#FFFFFF',
    paddingLeft: 20,
    fontSize: 20,
  },
  aboutView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  aboutTwitter: {
    marginLeft: 3,
    marginRight: 7,
    color: '#7B1FA2',
  },
  aboutGithub: {
    marginLeft: 5,
    color: '#7B1FA2',
  },
});

export default List;
