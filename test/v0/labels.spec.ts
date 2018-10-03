import CreateGlo from '../../src/index';
import axios, { getMock, postMock, deleteMock } from '../../__mocks__/axios';
jest.mock('axios');


describe('Label tests', () => {
    const Glo = CreateGlo('abcd');
    const board_id = 'testing_board_id';
    const label_name = 'testing_label_name';
    const label_id = 'testing_label_id';
    const color1 = {
        r: 1,
        g: 1,
        b: 1
    };
    const color2 = {
        r: 2,
        g: 2,
        b: 2
    };

    beforeEach(() => {
        getMock.mockClear();
        postMock.mockClear();
        deleteMock.mockClear();
    })

    test('Create label', async () => {
        const response = await Glo.Labels.createLabel(board_id, label_name, color1);
        expect(response).toEqual('data')

        expect(postMock).toHaveBeenCalledTimes(1);
        expect(postMock).toHaveBeenCalledWith(`/api/glo/boards/${board_id}/labels`, {
            name: label_name,
            color: color1
        });
    });

    test('Delete label', async () => {
        const response = await Glo.Labels.deleteLabel(board_id, label_id);
        expect(response).toEqual('data')

        expect(deleteMock).toHaveBeenCalledTimes(1);
        expect(deleteMock).toHaveBeenCalledWith(`/api/glo/boards/${board_id}/labels`, {
            data: {
                id: label_id
            }
        });
    });

    test('Update label', async () => {
        const response = await Glo.Labels.updateLabel(board_id, label_id, label_name, color2);
        expect(response).toEqual('data')

        expect(postMock).toHaveBeenCalledTimes(1);
        expect(postMock).toHaveBeenCalledWith(`/api/glo/boards/${board_id}/labels`, {
            name: label_name,
            color: color2,
            id: label_id
        });
    });
})