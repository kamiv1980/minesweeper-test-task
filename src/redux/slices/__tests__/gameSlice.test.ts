import reducer, {
    setParams,
    setLevel,
    initialState,
} from '../gameSlice';

describe('gameSlice reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setParams', () => {
        const params = { width: 8, height: 8, mines: 5, minesArray: [] };
        const state = reducer(initialState, setParams(params));
        expect(state.width).toEqual(params.width);
        expect(state.height).toEqual(params.height);
        expect(state.minesArray).toEqual(params.minesArray);
    });

    it('should handle setLevel', () => {
        const state = reducer(initialState, setLevel({ level: 'medium' }));
        expect(state.level).toEqual('medium');
        expect(state.width).toEqual(16);
        expect(state.height).toEqual(16);
        expect(state.mines).toEqual(40);
    });
});
