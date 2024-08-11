# COVID’19 and Mood of Spotify Users: an intricate interplay

### View Demo: https://asadahmadk.github.io/MSDVthesis/
### [Video Presentation](https://github.com/asadahmadk/MSDVthesis/blob/main/Thesis%20Paper.pdf)
Music has a profound impact on our lives, calming and comforting our souls. Last few years the world has undergone tremendous changes. This project is a short and simple introduction of the basic principles of mood as defined by Spotify using the data from Spotify open API. My project focuses on the intricate interplay of four major covid events and the mood of spotify users. The four components of music as identified by Spotify are: valence, energy, danceability and tempo. Using the major events of COVID’19 these four elements are analyzed in the visualization using digital medium for the users to explore  these elements against the timeline. 

This topic mainly addresses the interesting fact that when individuals are sad, depressed or unmotivated they tend to listen to positive, high energy and danceable music. It covers a social and psychological aspect of Spotify users, contributing to the curiosity of the user base and how to better understand human behavior. My method is to allow users to identify the casual relationship and the coping mechanisms of the Spotify users during tough times like COVID’19. It is one of its kind of works as it represents the interplay of mood during COVID’19 and music. While mostly the published works are curtailed to trends but do not overlap with a global event like a pandemic.

## Step 1 - Data Collection
Data was scraped using Python script using Spotipy library. Global sound track data was scraped from January 2020 to December 2022. Spotify uses various audio features to analyze and classify tracks, which help in creating recommendations and playlists. The key audio features used to measure mood by Spotify are:

1. Valence: A measure of the musical positiveness conveyed by a track. Higher valence indicates a more positive mood (e.g., happy, cheerful), while lower valence indicates a more negative mood (e.g., sad, angry).
2. Energy: A measure that represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.
3. Danceability: A measure of how suitable a track is for dancing based on a combination of musical elements, including tempo, rhythm stability, beat strength, and overall regularity. Tracks with high danceability scores are easier to dance to.
4. Tempo: The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

During this process data was analyzed and insights were extracted to build the multiple scenarios.
   
<img width="1137" alt="Screenshot 2024-08-10 at 11 19 29 PM" src="https://github.com/user-attachments/assets/4cc6dcd0-718b-4c5c-bd08-08380b871fdb">

## Step 2 - Design Layout
![Design Layout](https://github.com/asadahmadk/MSDVthesis/assets/109235609/bb00f009-7c99-4a05-9d14-f78f0ebc6118)

## Step 3 - High Fidelity Design
It was an iterative process from sketches to multiple designs, a final high fidelity design was created using [Figma](https://www.figma.com/design/63pcFwiA8w53ecq0DULiv5/Thesis-Wireframes?node-id=0-1&t=frF56N5NXnrdw4IB-1).

<img width="728" alt="Screenshot 2024-08-10 at 11 27 55 PM" src="https://github.com/user-attachments/assets/172837fd-cec9-40ec-bc89-e4e4cde813e1">

## Step 4 - Coding the Data Story
Using HTML, CSS and Javascript: data story was created. 
<img width="638" alt="Screenshot 2024-08-10 at 11 49 37 PM" src="https://github.com/user-attachments/assets/1c1f0c9c-fb64-45e7-ad58-e8a11072b0fd">

## Key Insights
1. Valence and Energy are coorelated indicating every happy song is fast, loud and noisy. Kept the users energetic and enthusiastic.
2. Users preferred upbeat songs to keep their moods elevated indoors as evident through danceability.
3. Tempo, danceability,energy and valence indicate users kept themselves motivated listening to positive, happier and lively music.
4. 92% of the Spotify Users listened to Taylor Swift songs during this time of uncertainty.














