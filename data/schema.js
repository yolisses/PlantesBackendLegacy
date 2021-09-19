/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Plant{
        id:ID
        name:String
        description:String
        price:Float
        swap:Boolean
        donate:Boolean
        amount:Int
        images:[String]
        card:String
        tags:[String]
    }

    type Friend{
        id:ID
        firstName:String
        lastName:String
        gender:Gender
        language:String
        age:Int
        email: String
        contacts:[Contact]
    }

    type Contact{
        firstName:String
        lastName:String
    }

    type Series {
        id:ID
        seriesName:String
        year:Int
        rating:Rating
    }

    enum Rating{
        ONE
        TWO
        THREE
    }

    enum Gender{
        MALE
        FEMALE
        OTHER
    }

    input SeriesInput{
        id:ID
        seriesName:String
        year:Int
        rating:Rating
    }

    input PlantInput{
        name:String
        description:String
        price:Float
        swap:Boolean
        donate:Boolean
        amount:Int
        tags:[String]
        imagesCount:Int!
    }

    input FriendInput{
        id:ID
        firstName:String
        lastName:String
        gender:Gender
        language:String
        age:Int
        email: String
        contacts:[ContactInput]
    }

    input ContactInput{
        firstName:String
        lastName:String
    }

    type Query{
        getAllFriends:[Friend]
        getPlant(id:ID):Plant
        getAllPlants:[Plant]
        findASeries(id:ID):Series
    }

    type Mutation{
        createFriend(input:FriendInput):Friend
        createPlant(input:PlantInput):Plant
        addASeries(series:SeriesInput):Series
    }

`;

// Allgum dia...
// enum Part{
//     PLANT
//     SEED
//     CUTTING
//     BULB
// }
