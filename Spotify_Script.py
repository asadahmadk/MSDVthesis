def get_data_from_spotify(song_id):
    import spotipy
    from spotipy.oauth2 import SpotifyClientCredentials
    import pandas as pd
    import time
    time.sleep(0.5)
    #clientid = 'bf1f44b24e7b4ba8844b1ad035c5c411'
    #ClientSecret = '3390a7d65e344daaa2e0dfbc961a52f3'
    #clientid= 'd873e12ef2374bf082272b9da4ea97bf'
    #ClientSecret='fef0b65be76b4724a79cde0a2ae296f0'
    clientid='52535ecf4583448899b1d217b4dc9946'
    ClientSecret='02b2a148e2ea493f8261941573122f2f'
    sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=clientid,client_secret=ClientSecret))
    song_id = song_id
    print("calling audio features api")
    print("Songs_ID")
    print(song_id)
    print("--------")
    audio_features = sp.audio_features(tracks =song_id)
    #print(audio_features)
    for track in audio_features:
        danceability=str(track['danceability']).replace("|","")
        energy=str(track['energy']).replace("|","")
        key=str(track['key']).replace("|","")
        loudness=str(track['loudness']).replace("|","")
        mode=str(track['mode']).replace("|","")
        speechiness=str(track['speechiness']).replace("|","")
        acousticness=str(track['acousticness']).replace("|","")
        instrumentalness=str(track['instrumentalness']).replace("|","")
        liveness=str(track['liveness']).replace("|","")
        valence=str(track['valence']).replace("|","")
        tempo=str(track['tempo']).replace("|","")
        type_=str(track['type']).replace("|","")
        id_=str(track['id']).replace("|","")
        uri=str(track['uri']).replace("|","")
        track_href=str(track['track_href']).replace("|","")
        analysis_url=str(track['analysis_url']).replace("|","")
        duration_ms=str(track['duration_ms']).replace("|","")
        time_signature=str(track['time_signature']).replace("|","")
    
    
    
    
    ##results = sp.search(q='Pakistan', limit=20)
    ##print(results)
    further_track_details = sp.track(song_id)
    
    artist_name=str(further_track_details['artists'][0]['name']).replace("|","")
    release_date = str(further_track_details['album']['release_date']).replace("|","")
    song_name = str(further_track_details['name']).replace("|","")
    #row_title = "song_id"+"|"+"artist_name"+"|"+"release_date"+"|"+"song_name"+"|"+"danceability"+"|"+"energy"+"|"+"key"+"|"+"loudness"+"|"+"mode"+"|"+"speechiness"+"|"+"acousticness"+"|"+"instrumentalness"+"|"+"liveness"+"|"+"valence"+"|"+"tempo"+"|"+"type_"+"|"+"id_"+"|"+"uri"+"|"+"track_href"+"|"+"analysis_url"+"|"+"duration_ms"+"|"+"time_signature"
    row_data =song_id+"|"+artist_name+"|"+release_date+"|"+song_name+"|"+danceability+"|"+energy+"|"+key+"|"+loudness+"|"+mode+"|"+speechiness+"|"+acousticness+"|"+instrumentalness+"|"+liveness+"|"+valence+"|"+tempo+"|"+type_+"|"+id_+"|"+uri+"|"+track_href+"|"+analysis_url+"|"+duration_ms+"|"+time_signature
    #print(row_title)
    #print(row_data)
    return row_data



import os
entries =  os.listdir(r'E:\\Spotify_Data\\')
print("Total_Flies_Already_Scrapped")
print(len(entries))
#print(entries)
file1 = open('E:\\Spotify_top_songs.csv', 'r')
print("Total_Spotify_Songs")
print(len(file1.readlines()))
file1 = open('E:\\Spotify_top_songs.csv', 'r')
lines = file1.readlines()
#for line in lines:
#    if line.rstrip('\n') in entries:
#        entries.remove(line.rstrip('\n'))
#        print(len(entries))

#for line in lines:
#    try:
#        if line.rstrip('\n') in os.listdir(r'E:\\Spotify_Data\\'):
#            entries.remove(line.rstrip('\n'))
#            print(len(entries))
#    except Exception as e:
#        print(e)

print("Items to be Scrapped")
print(len(entries))
for line in lines:
    print(line)
    if line.rstrip('\n') in (os.listdir(r'E:\\Spotify_Data\\')):
        print("File Already in Folder")
    else:
        try:
            print("New_Entry_Found_Scraping_Now")
            row_data=(get_data_from_spotify(line.rstrip('\n')))
            row_title = "song_id"+"|"+"artist_name"+"|"+"release_date"+"|"+"song_name"+"|"+"danceability"+"|"+"energy"+"|"+"key"+"|"+"loudness"+"|"+"mode"+"|"+"speechiness"+"|"+"acousticness"+"|"+"instrumentalness"+"|"+"liveness"+"|"+"valence"+"|"+"tempo"+"|"+"type_"+"|"+"id_"+"|"+"uri"+"|"+"track_href"+"|"+"analysis_url"+"|"+"duration_ms"+"|"+"time_signature"
               
            f = open('E:\Spotify_Data' + "\\" + line.rstrip('\n') , 'w')
            #print(row_data)
            f.write(row_title)
            f.write('\n')
            f.write(row_data)
            f.write('\n')
            f.close()
        except Exception as e:
            print(e)
