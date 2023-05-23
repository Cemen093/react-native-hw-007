import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Categories from "./components/Categories";
import Gallery from "./components/Gallery";
import R from "./res/R";
import {useEffect, useState} from "react";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

const API_KEY = '23798924-17f42c690434b5dec74a9c318';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=`;
const getHits = async (query) => {
  const response = await fetch(`${API_URL}${query}`);
  const json = await response.json();
  return json.hits;
}

const useFetching = (asyncCallback) => {
  const [isHitsLoading, setIsHitsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchHits = async (...params) => {
    try {
      setIsHitsLoading(true);
      await asyncCallback(...params);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("error" + error)
    } finally {
      setIsHitsLoading(false);
    }
  };

  return [fetchHits, isHitsLoading, errorMessage];
};

export default function App() {
  const categories = [
    {id: 0, image: R.images.cloth, text: "Cloth", onPress: null},
    {id: 1, image: R.images.dinner, text: "Dinner", onPress: null},
    {id: 2, image: R.images.leisure, text: "Leisure", onPress: null},
    {id: 3, image: R.images.sport, text: "Sport", onPress: null}
  ]


  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [fetchHits, isHitsLoading, errorMessage] = useFetching(async () => {
    const hits = await getHits(query);
    setHits(hits)
  })

  useEffect(() => {
    if (query){
      fetchHits();
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      {
      isHitsLoading 
      ? 
      <LoadingPlaceholder/> 
      : 
      <Gallery style={styles.gallery} hits={hits}/>
      }
      <Categories style={styles.categories} categories={categories}
                  onPress={(text) => {setQuery(text)}}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  gallery: {
    height: "85%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor: "green",
  },
  categories: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor: "blue",
  }
});
