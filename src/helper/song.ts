import { millisecondsToString } from "@/lib/utils";
import { Provider } from "@/types/provider";
import { Song } from "@/types/song";
import { SpotifyPlaylistSong } from "@/types/spotify";
import { YoutubeVideo } from "@/types/youtube";

type SpotifySong = SpotifyPlaylistSong & { youtube_song?: Song };

export function formatSongProps(song: YoutubeVideo | SpotifySong): Song {
  if ("snippet" in song) {
    return {
      provider: Provider.YOUTUBE,
      id: song.id,
      songTitle: song.snippet.title,
      by: song.snippet.channelTitle,
      images: {
        large: song.snippet.thumbnails.standard.url,
        medium: song.snippet.thumbnails.medium.url,
        small: song.snippet.thumbnails.default.url,
      },
      likesCount: song.statistics.likeCount,
      songDuration: song.contentDetails.duration,
      songLongTitle: `Play ${song.snippet.title} By ${song.snippet.channelTitle}`,
      viewsCount: song.statistics.viewCount,
    };
  }

  return {
    provider: Provider.SPOTIFY,
    id: song.track.id,
    songTitle: song.track.name,
    by: song.track.artists
      .slice(2)
      .reduce(
        (p_artists_str, { name: artist_name }) =>
          p_artists_str.concat(" ", artist_name),
        ""
      ),
    images: {
      large: song.track.album.images[1].url,
      medium: song.track.album.images[1].url,
      small: song.track.album.images[1].url,
    },
    songLongTitle: song.track.artists
      .slice(2)
      .reduce((acc, crr) => (acc += " " + crr.name), ""),
    popularity: song.track.popularity,
    songDuration: millisecondsToString(song.track.duration_ms),
  };
}
