import {AppTheme} from "../../services/theme";
import {ILoginResponse} from "../../interfaces";

type StorageObjectMap = {
  'App/session': ILoginResponse;
  'App/theme': AppTheme;
  'App/token': string;
};

export type StorageObjectType = 'App/session' | 'App/theme' | 'App/token';

export type StorageObjectData<T extends StorageObjectType> = {
  type: T;
  data: StorageObjectMap[T];
};
