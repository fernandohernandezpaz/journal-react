import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, setSaving } from "../../../src/store/journal/journalSlide";
import { startNewNote } from "../../../src/store/journal/thunks";
import { fireBaseDB } from "../../../src/core/firebase/config";

describe( 'Tests for journal thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    it('should create a new note in blank with startNewNote and get a success', async ( )=> {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid } });

        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( setSaving() );

        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
          body: '',
          title: '',
          id: expect.any( String ),
          date: expect.any( Number ),
          imageUrls: expect.any( Array ),
        }) );

        const collectionRef = collection( fireBaseDB, `${uid}/journal/notes` );

        const docs = await getDocs( collectionRef );

        const deletePromises = [];

        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );

    });

});
