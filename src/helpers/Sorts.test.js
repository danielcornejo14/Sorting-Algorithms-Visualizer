const bubbleSort = require('./Sorts').bubbleSort

describe('bubbleSort', () => {
    it('should sort an array in ascending order', async () => {
        const arr = [5, 3, 1, 2, 4];
        const expectedArr = [1, 2, 3, 4, 5];

        await bubbleSort(arr, () => {}, () => {}, () => {});

        expect(arr).toEqual(expectedArr);
    });

    it('should call the updateBars function with the updated array after each iteration', async () => {
        const arr = [5, 3, 1, 2, 4];
        const updateBarsSpy = jest.fn();

        await bubbleSort(arr, updateBarsSpy, () => {}, () => {});

        expect(updateBarsSpy).toHaveBeenCalledTimes(arr.length - 1);
        expect(updateBarsSpy).toHaveBeenCalledWith([...arr]);
    });

    it('should call the accessedBar function with the index of each element that is accessed', async () => {
        const arr = [5, 3, 1, 2, 4];
        const accessedBarSpy = jest.fn();

        await bubbleSort(arr, () => {}, accessedBarSpy, () => {});

        expect(accessedBarSpy).toHaveBeenCalledTimes(arr.length * 2 - 1);
        expect(accessedBarSpy).toHaveBeenNthCalledWith(0, 0);
        expect(accessedBarSpy).toHaveBeenNthCalledWith(1, 1);
        expect(accessedBarSpy).toHaveBeenNthCalledWith(2, 0);
        expect(accessedBarSpy).toHaveBeenNthCalledWith(3, 1);
        expect(accessedBarSpy).toHaveBeenNthCalledWith(4, 0);
    });

    it('should call the comparedBar function with the indices of each pair of elements that are compared', async () => {
        const arr = [5, 3, 1, 2, 4];
        const comparedBarSpy = jest.fn();

        await bubbleSort(arr, () => {}, () => {}, comparedBarSpy);

        expect(comparedBarSpy).toHaveBeenCalledTimes(arr.length - 1);
        expect(comparedBarSpy).toHaveBeenNthCalledWith(0, 1);
        expect(comparedBarSpy).toHaveBeenNthCalledWith(1, 2);
        expect(comparedBarSpy).toHaveBeenNthCalledWith(2, 3);
        expect(comparedBarSpy).toHaveBeenNthCalledWith(3, 4);
    });
});