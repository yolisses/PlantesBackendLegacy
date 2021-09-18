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
        images:[String]
        card:String
        tags:[String]
        part:Part
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

    enum Part{
        PLANT
        SEED
        CUTTING
        BULB
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
        tags:[String]
        imagesCount:Int!
        part:Part
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
        getAllPlants:[Plant]
        findASeries(id:ID):Series
    }

    type Mutation{
        createFriend(input:FriendInput):Friend
        createPlant(input:PlantInput):Plant
        addASeries(series:SeriesInput):Series
    }

`;
