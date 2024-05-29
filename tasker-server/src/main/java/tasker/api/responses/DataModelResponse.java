package tasker.api.responses;

import tasker.api.models.DataModel;

public class DataModelResponse extends ApiResponse {
    private final DataModel model;

    public DataModelResponse(String message, DataModel model) {
        super(message);
        this.model = model;
    }

    public DataModel getModel() {
        return model;
    }
}
