<template>
    <div 
        id="Login">
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
                font-size: 5.5vw;
                color: white;
                margin-top: 5%;
                margin-bottom: 5%;
            }
        }
    }

    a {
        height: 60px;
        width: 350px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        font-family: 'Roboto', sans-serif;
        text-decoration: none;
        cursor: url('../assets/ms-cursor.png'), auto;
        margin-bottom: 5%;
        &:hover {
            opacity: 0.75;
        }
        > p {
            white-space: nowrap;
            margin: auto;
        }
    }

    #googleBtn {
        background-color: white;
        color: black;
        > img {
            max-height: 80%;
            border-radius: 5px;
        }
        > p {
            font-size: 1.65vw;
        }
    }

    #fbBtn {
        background-color: #1971E2;
        color: white;
        font-weight: 700;
        > img {
            height: 75%;
            margin-left: 12.5px;
        }
        > p {
            font-size: 1.75vw;
            letter-spacing: 0.5px;
        }
    }

    @include for-desktop-large-only {
        a {
            height: 100px;
            width: 60%;
        }
        #Login > div > p {
            font-size: 7.5vw;  
        }
        #googleBtn > p {
            font-size: 3vw;
        }
        #fbBtn {
            > p {
                font-size: 3vw;
            }
        }
    }

    @include for-desktop-extra-large-only {
        a {
            height: 140px;
        }
    }

    @include for-desktop-only {
        #Login > div > p {
            font-size: 7.5vw;  
        }
        #googleBtn > p {
            font-size: 2.05vw;
        }
        #fbBtn > p {
            font-size: 2.1vw;
        }
    }

    @include for-tablet-only {
        #Login > div > p {
            font-size: 10vw;  
        }
        #googleBtn > p {
            font-size: 2.75vw;
        }
        #fbBtn > p {
            font-size: 2.8vw;
        }
    }

    @include for-tablet-small-2-only {
        #googleBtn > p {
            font-size: 4vw;
        }
        #fbBtn > p {
            font-size: 4.25vw;
        }
    }

    @include for-mobile-only {
        a {
            width: 300px;
        }
        #googleBtn > p {
            font-size: 5.25vw;
        }
        #fbBtn > p {
            font-size: 5.5vw;
        }
    }
</style>