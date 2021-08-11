export function signInWithPassword(email, password) {
    console.log('Llamado MOCK : ', email, password);
    return Promise.resolve(
        {
            user: {
                uid: "IjiGvGgWskTpPRMlvoDokGNAcEo1",
                displayName: "Nataly Farias",
                photoURL: "https://lh3.googleusercontent.com/a/AATXAJxRVn8jQE7lDZr9KkKZNvQ7lGoHARSTXig7ngfH=s96-c",
                email: "nataly.fariasg@gmail.com",
                emailVerified: true
            },
        }
    );
};

export const currentUser = () => {
    const user = firebase.auth().currentUser;
    return user;
  };
  