<template>
    <div id="Login">
        <div>
            <p>Welcome Maplers!</p>
            <a
                id="googleBtn"
                :href="`${url}/google`">
                <img 
                    src="../assets/Social/google.jpg"
                    alt="Google Button"
                />
                <p>Sign in with Google</p>
            </a>
            <a
                id="fbBtn"
                :href="`${url}/facebook`">
                    <img
                        src="../assets/Social/facebook.svg" 
                        alt="Facebook Button"
                    />
                    <p>Log in With Facebook</p>
            </a>
            <a 
                id="guestBtn"
                href="http://localhost:8080/#/home"
                >
                <img 
                    src="../assets/Social/guest.svg" 
                    alt="">
                <p>Login as Guest User</p>
            </a>


        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    computed: {
        url(){
            return 'https://legion-backend.herokuapp.com/auth';
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../mixins.scss';

    #Login {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden; 
        > div {
            height: auto;
            width: auto;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            border-radius: 5px;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.75);
            > p {
                white-space: nowrap;
                font-size: 4.5em;
                color: white;
                margin-top: 5%;
                margin-bottom: 5%;
            }
        }
    }

    a {
        height: 40px;
        width: 227px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        text-decoration: none;
        cursor: url('../assets/ms-cursor.png'), auto;
        margin-bottom: 5%;
        &:hover {
            opacity: 0.75;
        }
    }

    #googleBtn {
        background-color: white;
        color: black;
        font-size: 1em;
        > img {
        max-height: 100%;
        width: 20%;
        margin-right: 10%;
        }
    }

    #fbBtn {
        background-color: #1971E2;
        color: white;
        font-weight: 700;
        font-size: 1.05em;
        > img {
            max-height: 60%;
            margin-left: 12px;
            margin-right: 10px;  
        }
        > p {
            white-space: nowrap;
            letter-spacing: 0.5px;
        }
    }

    #guestBtn {
        background-color: black;
        color: white;
        > img {
            max-width: 15%;
            margin-left: 7.5px;
            margin-right: 7.5%;
            padding-top: 7.5px;
        }
        > p {
            font-size: 1em;
        }
    }

    @include for-tablet-small-only {
        #Login > div > p {
            font-size: 10vw;
        }
    }


</style>