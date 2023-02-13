package main

import (
	"context"
	"fmt"
	"os"

	_ "github.com/joho/godotenv/autoload"
	openfga "github.com/openfga/go-sdk"
)

func main() {
	configuration, err := openfga.NewConfiguration(openfga.Configuration{
		ApiScheme: os.Getenv("FGA_API_SCHEME"), // optional, defaults to "https"
		ApiHost:   os.Getenv("FGA_API_HOST"),   // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
		StoreId:   os.Getenv("FGA_STORE_ID"),
	})

	if err != nil {
		// .. Handle error
	}

	apiClient := openfga.NewAPIClient(configuration)

	body := openfga.WriteAuthorizationModelRequest{TypeDefinitions: []openfga.TypeDefinition{
		{
			Type: "user",
		},
		{
			Type: "document",
			Relations: &map[string]openfga.Userset{
				"reader": {This: &map[string]interface{}{}},
				"writer": {This: &map[string]interface{}{}},
				"owner":  {This: &map[string]interface{}{}},
			},
			Metadata: &openfga.Metadata{
				Relations: &map[string]openfga.RelationMetadata{
					"reader": {
						DirectlyRelatedUserTypes: &[]openfga.RelationReference{{Type: "user"}},
					},
					"writer": {
						DirectlyRelatedUserTypes: &[]openfga.RelationReference{{Type: "user"}},
					},
					"owner": {
						DirectlyRelatedUserTypes: &[]openfga.RelationReference{{Type: "user"}},
					},
				},
			},
		},
	}}
	data, _, err := apiClient.OpenFgaApi.WriteAuthorizationModel(context.Background()).Body(body).Execute()

	fmt.Printf("AuthorizationModelId %s\n", *data.AuthorizationModelId)
}
