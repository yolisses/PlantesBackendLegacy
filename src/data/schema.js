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

    type Query{
        getPlant(id:ID):Plant
        getAllPlants:[Plant]
        getPlantImagesLinks(amount:Int):[String!]
    }

    type Mutation{
        createPlant(input:PlantInput):Plant
    }
`;
