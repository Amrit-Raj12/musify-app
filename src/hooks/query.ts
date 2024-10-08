import catchAsyncError from 'api/catchError';
import {getClient} from 'api/client';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'store/notification';
import {AudioData, CompletePlaylist, History, Playlist} from 'types/audio';
import {Keys, getFromAsyncStorage} from 'utils/asyncStorage';

const fetchLates = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const distpatch = useDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: () => fetchLates(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/recomended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const distpatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: () => fetchRecommended(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client('/playlist/by-profile');
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const distpatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: () => fetchPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const distpatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: () => fetchUploadsByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/favorite');
  return data.audios;
};

export const useFetchFavorite = () => {
  const distpatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: () => fetchFavorites(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
const fetchHistories = async (): Promise<History[]> => {
  const client = await getClient();
  const {data} = await client('/history');
  return data.histories;
};

export const useFetchHistories = () => {
  const distpatch = useDispatch();
  return useQuery(['histories'], {
    queryFn: () => fetchHistories(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecentlyPlayed = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/history/recently-played');
  return data.audios;
};

export const useFetchRecentlyPlayed = () => {
  const distpatch = useDispatch();
  return useQuery(['recently-played'], {
    queryFn: () => fetchRecentlyPlayed(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommendedPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client('/profile/auto-generated-playlist');
  return data.playlist;
};

export const useFetchRecommendedPlaylist = () => {
  const distpatch = useDispatch();
  return useQuery(['recommended-playlist'], {
    queryFn: () => fetchRecommendedPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchIsFavorite = async (id: string): Promise<boolean> => {
  const client = await getClient();
  const {data} = await client('/favorite/is-fav?audioId=' + id);
  return data.result;
};

export const useFetchIsFavorite = (id: string) => {
  const distpatch = useDispatch();
  return useQuery(['favorite', id], {
    queryFn: () => fetchIsFavorite(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicProfile = async (id: string): Promise<PublicProfile> => {
  const client = await getClient();
  const {data} = await client('/profile/info/' + id);
  return data.profile;
};

export const useFetchPublicProfile = (id: string) => {
  const distpatch = useDispatch();
  return useQuery(['profile', id], {
    queryFn: () => fetchPublicProfile(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicUploads = async (id: string): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/uploads/' + id);
  return data.audios;
};

export const useFetchPublicUploads = (id: string) => {
  const distpatch = useDispatch();
  return useQuery(['uploads', id], {
    queryFn: () => fetchPublicUploads(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      distpatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicPlaylist = async (id: string): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client('/profile/playlist/' + id);
  return data.playlist;
};

export const useFetchPublicPlaylist = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['playlist', id], {
    queryFn: () => fetchPublicPlaylist(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPlaylistAudios = async (id: string): Promise<CompletePlaylist> => {
  const client = await getClient();
  const {data} = await client('/profile/playlist-audios/' + id);
  return data.list;
};

export const useFetchPlaylistAudios = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['playlist-audios', id], {
    queryFn: () => fetchPlaylistAudios(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchIsFollowing = async (id: string): Promise<boolean> => {
  const client = await getClient();
  const {data} = await client('/profile/is-following/' + id);
  return data.status;
};

export const useFetchIsFollowing = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['is-following', id], {
    queryFn: () => fetchIsFollowing(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};
