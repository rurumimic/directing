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

	body := openfga.WriteRequest{
		Writes: &openfga.TupleKeys{
			TupleKeys: []openfga.TupleKey{
				{
					User:     openfga.PtrString("user:anne"),
					Relation: openfga.PtrString("reader"),
					Object:   openfga.PtrString("document:Z"),
				},
			},
		},
		AuthorizationModelId: openfga.PtrString("01GS5G5662KBME04PN60A4DN5B"),
	}

	_, response, err := apiClient.OpenFgaApi.Write(context.Background()).Body(body).Execute()
	if err != nil {
		// .. Handle error
	}

	fmt.Println(response)
}
