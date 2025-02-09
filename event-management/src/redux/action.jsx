import { db } from "../firebase";  // Assuming Firebase is properly initialized

// Action to fetch events from Firestore
export let fetchdata = () => {
    return async(dispatch) => {
        dispatch({ type: "FETCH-REQ" });

        try {
            // Fetch events from Firestore
            const querySnapshot = await db.collection("events").get();
            const mydata = querySnapshot.docs.map(doc => doc.data()); // Assuming event data is stored in Firestore

            let eventsData = mydata.map(item => ({
                id: item.id,  // Assuming each event has a unique ID
                title: item.title,
                description: item.description,
                media: item.media[0],  // Example for the first media item
                startTime: item.startTime,
                endTime: item.endTime,
                location: item.location,  // Assuming location is stored as a string
            }));

            dispatch({ type: "FETCH-COM", payload: eventsData });
        } catch (error) {
            dispatch({ type: "FETCH-FAIL" });
        }
    };
};

// Action to post event data to Firestore
export let postdata = (post = { obj }) => {
    return async(dispatch) => {
        dispatch({ type: "POST-REQ" });

        try {
            // Post event data to Firestore
            await db.collection("events").add({
                title: post.title,
                description: post.description,
                media: post.media,
                startTime: post.startTime,
                endTime: post.endTime,
                location: post.location,
                invitees: post.invitees, // Include invitees in Firestore if needed
            });

            dispatch({ type: "POST-COM" });
        } catch (error) {
            dispatch({ type: "POST-FAIL" });
        }
    };
};
