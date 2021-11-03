import { request } from '@fesjs/fes';
import { debounce } from 'debounce';

export const debounceRequest = debounce(request, 300);
