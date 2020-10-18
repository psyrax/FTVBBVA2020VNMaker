ui.UiFactory.layouts.loadMenuLayout = {
  "type": "ui.FreeLayout",
  "frame": [0, 0, Graphics.width, Graphics.height],
  "preload": {
    graphics: [
      {
        folder: $(function() {
          return $dataFields.database.system.menuBackground.folderPath || "Graphics/Pictures";
        }),
        name: $(function() {
          return $dataFields.database.system.menuBackground.name || 'UI/bg-generic.png';
        })
      }
    ]
  },
  "controls": [
    {
      "type": "ui.Image",
      "imageFolder": function() {
        return $dataFields.database.system.menuBackground.folderPath || "Graphics/Pictures";
      },
      "image": function() {
        return $dataFields.database.system.menuBackground.name || 'UI/bg-generic.png';
      },
      "frame": [0, 0, Graphics.width, Graphics.height],
      "action": {
        "event": "onCancel",
        "name": "previousLayout",
        "params": {}
      }
    }, {
      "type": "ui.BackButton",
      "frame": [Graphics.width - 170, Graphics.height - 65, 150, 45]
    }, {
      "type": "ui.TitledWindow",
      "frame": [20, 0, Math.floor((Graphics.width - 200) / 420) * 420, Graphics.height],
      "params": {
        "title": {
          "lcId": "B215F6EB2576884547399CC0CF2F38E855FD",
          "defaultText": "Load Game"
        }
      }
    }, {
      "type": "ui.DataScrollView",
      "id": "list",
      "frame": [20, 45, Math.floor((Graphics.width - 200) / 420) * 420, Graphics.height - 45],
      "params": {
        "columns": Math.floor((Graphics.width - 200) / 420),
        "spacing": [10, 10],
        "dataSource": $(function() {
          return $dataFields.saveGameSlots;
        }),
        "template": {
          "descriptor": {
            "type": "ui.SaveGameSlot",
            "params": {
              "actions": [
                {
                  "name": "executeFormulas",
                  "params": [
                    $(function() {
                      return $tempFields.slot = o.parent.index;
                    })
                  ]
                }, {
                  "name": "createControl",
                  "conditions": [
                    {
                      "field": $(function() {
                        var ref;
                        return (ref = $dataFields.saveGameSlots[$tempFields.slot]) != null ? ref.date : void 0;
                      }),
                      "notEqualTo": $(function() {
                        return '';
                      })
                    }, {
                      "field": $(function() {
                        return $dataFields.settings.confirmation;
                      }),
                      "equalTo": true
                    }, {
                      "field": $(function() {
                        return $dataFields.tempSettings.loadMenuAccess;
                      }),
                      "equalTo": true
                    }
                  ],
                  "params": {
                    "descriptor": {
                      "id": "confirmationDialog",
                      "type": "ui.ConfirmationDialog",
                      "zIndex": 90000,
                      "params": {
                        "message": {
                          "lcId": "2BD08CC65B9A2248C749B9C4DEEAADE8E20A",
                          "defaultText": "Do you really want to load?"
                        },
                        "acceptActions": [
                          {
                            "name": "loadGame",
                            "params": {
                              "slot": $(function() {
                                return $tempFields.slot;
                              })
                            }
                          }
                        ],
                        "rejectActions": [
                          {
                            "name": "disposeControl",
                            "params": $(function() {
                              return 'confirmationDialog';
                            })
                          }
                        ]
                      }
                    }
                  }
                }, {
                  "conditions": [
                    {
                      "field": $(function() {
                        var ref;
                        return (ref = $dataFields.saveGameSlots[$tempFields.slot]) != null ? ref.date : void 0;
                      }),
                      "notEqualTo": $(function() {
                        return '';
                      })
                    }, {
                      "field": $(function() {
                        return !$dataFields.settings.confirmation || !$dataFields.tempSettings.loadMenuAccess;
                      }),
                      "equalTo": true
                    }
                  ],
                  "name": "loadGame",
                  "params": {
                    "slot": $(function() {
                      return $tempFields.slot;
                    })
                  }
                }
              ]
            }
          }
        }
      }
    }
  ]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQXJCLEdBQXNDO0VBQ2xDLE1BQUEsRUFBUSxlQUQwQjtFQUVsQyxPQUFBLEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLFFBQVEsQ0FBQyxLQUFoQixFQUF1QixRQUFRLENBQUMsTUFBaEMsQ0FGeUI7RUFHbEMsU0FBQSxFQUFXO0lBQUUsUUFBQSxFQUFVO01BQUM7UUFBQSxNQUFBLEVBQVMsQ0FBQSxDQUFFLFNBQUE7aUJBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQTNDLElBQXVEO1FBQTFELENBQUYsQ0FBVDtRQUEyRixJQUFBLEVBQU0sQ0FBQSxDQUFFLFNBQUE7aUJBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQTNDLElBQW1EO1FBQXRELENBQUYsQ0FBakc7T0FBRDtLQUFaO0dBSHVCO0VBSWxDLFVBQUEsRUFBWTtJQUNSO01BQ0ksTUFBQSxFQUFRLFVBRFo7TUFFSSxhQUFBLEVBQWdCLFNBQUE7ZUFBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBM0MsSUFBeUQ7TUFBNUQsQ0FGcEI7TUFHSSxPQUFBLEVBQVMsU0FBQTtlQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUEzQyxJQUFtRDtNQUF0RCxDQUhiO01BSUksT0FBQSxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxRQUFRLENBQUMsS0FBaEIsRUFBdUIsUUFBUSxDQUFDLE1BQWhDLENBSmI7TUFLSSxRQUFBLEVBQVU7UUFBRSxPQUFBLEVBQVMsVUFBWDtRQUF1QixNQUFBLEVBQVEsZ0JBQS9CO1FBQWlELFFBQUEsRUFBVSxFQUEzRDtPQUxkO0tBRFEsRUFRUjtNQUNJLE1BQUEs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QUF5QixRQUFBLEVBQVUsQ0FBQSxDQUFFLFNBQUE7cUNBQUc7NEJBQUgsQ0FBRixDQUFuQzsyQkFBRDt5QkFIWDt1QkFKQTtxQkFEUjttQkFQZDtpQkFQTyxFQTBCUDtrQkFBRSxZQUFBLEVBQWM7b0JBQ1o7c0JBQUUsT0FBQSxFQUFVLENBQUEsQ0FBRSxTQUFBO0FBQUcsNEJBQUE7Z0dBQTJDLENBQUU7c0JBQWhELENBQUYsQ0FBWjtzQkFBcUUsWUFBQSxFQUFlLENBQUEsQ0FBRSxTQUFBOytCQUFHO3NCQUFILENBQUYsQ0FBcEY7cUJBRFksRUFFWjtzQkFBRSxPQUFBLEVBQVUsQ0FBQSxDQUFFLFNBQUE7K0JBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFlBQXRCLElBQXNDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztzQkFBbkUsQ0FBRixDQUFaO3NCQUFrRyxTQUFBLEVBQVcsSUFBN0c7cUJBRlk7bUJBQWhCO2tCQUdHLE1BQUEsRUFBUSxVQUhYO2tCQUd1QixRQUFBLEVBQVU7b0JBQUUsTUFBQSxFQUFTLENBQUEsQ0FBRSxTQUFBOzZCQUFHLFdBQVcsQ0FBQztvQkFBZixDQUFGLENBQVg7bUJBSGpDO2lCQTFCTztlQURMO2FBRkE7V0FETjtTQUpOO09BSmQ7S0FqQlE7R0FKc0IiLCJzb3VyY2VzQ29udGVudCI6WyJ1aS5VaUZhY3RvcnkubGF5b3V0cy5sb2FkTWVudUxheW91dCA9IHtcbiAgICBcInR5cGVcIjogXCJ1aS5GcmVlTGF5b3V0XCIsXG4gICAgXCJmcmFtZVwiOiBbMCwgMCwgR3JhcGhpY3Mud2lkdGgsIEdyYXBoaWNzLmhlaWdodF0sXG4gICAgXCJwcmVsb2FkXCI6IHsgZ3JhcGhpY3M6IFtmb2xkZXI6ICgkIC0+ICRkYXRhRmllbGRzLmRhdGFiYXNlLnN5c3RlbS5tZW51QmFja2dyb3VuZC5mb2xkZXJQYXRofHxcIkdyYXBoaWNzL1BpY3R1cmVzXCIpLCBuYW1lOiAkIC0+ICRkYXRhRmllbGRzLmRhdGFiYXNlLnN5c3RlbS5tZW51QmFja2dyb3VuZC5uYW1lIG9yICdVSS9iZy1nZW5lcmljLnBuZyddIH0sXG4gICAgXCJjb250cm9sc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLkltYWdlXCIsXG4gICAgICAgICAgICBcImltYWdlRm9sZGVyXCI6ICAtPiAkZGF0YUZpZWxkcy5kYXRhYmFzZS5zeXN0ZW0ubWVudUJhY2tncm91bmQuZm9sZGVyUGF0aCB8fCBcIkdyYXBoaWNzL1BpY3R1cmVzXCIsXG4gICAgICAgICAgICBcImltYWdlXCI6IC0+ICRkYXRhRmllbGRzLmRhdGFiYXNlLnN5c3RlbS5tZW51QmFja2dyb3VuZC5uYW1lIG9yICdVSS9iZy1nZW5lcmljLnBuZydcbiAgICAgICAgICAgIFwiZnJhbWVcIjogWzAsIDAsIEdyYXBoaWNzLndpZHRoLCBHcmFwaGljcy5oZWlnaHRdLFxuICAgICAgICAgICAgXCJhY3Rpb25cIjogeyBcImV2ZW50XCI6IFwib25DYW5jZWxcIiwgXCJuYW1lXCI6IFwicHJldmlvdXNMYXlvdXRcIiwgXCJwYXJhbXNcIjoge319XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLkJhY2tCdXR0b25cIixcbiAgICAgICAgICAgIFwiZnJhbWVcIjogW0dyYXBoaWNzLndpZHRoIC0gMTcwLCBHcmFwaGljcy5oZWlnaHQgLSA2NSwgMTUwLCA0NV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuVGl0bGVkV2luZG93XCIsXG4gICAgICAgICAgICBcImZyYW1lXCI6IFsyMCwgMCwgTWF0aC5mbG9vcigoR3JhcGhpY3Mud2lkdGgtMjAwKS80MjApKjQyMCwgR3JhcGhpY3MuaGVpZ2h0XSxcbiAgICAgICAgICAgIFwicGFyYW1zXCI6IHsgXCJ0aXRsZVwiOiB7IFwibGNJZFwiOiBcIkIyMTVGNkVCMjU3Njg4NDU0NzM5OUNDMENGMkYzOEU4NTVGRFwiLCBcImRlZmF1bHRUZXh0XCI6IFwiTG9hZCBHYW1lXCIgfSB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInVpLkRhdGFTY3JvbGxWaWV3XCIsXG4gICAgICAgICAgICBcImlkXCI6IFwibGlzdFwiLFxuICAgICAgICAgICAgXCJmcmFtZVwiOiBbMjAsIDQ1LCBNYXRoLmZsb29yKChHcmFwaGljcy53aWR0aC0yMDApLzQyMCkqNDIwLCBHcmFwaGljcy5oZWlnaHQgLSA0NV0sXG4gICAgICAgICAgICBcInBhcmFtc1wiOiB7IFxuICAgICAgICAgICAgICAgIFwiY29sdW1uc1wiOiBNYXRoLmZsb29yKChHcmFwaGljcy53aWR0aC0yMDApLzQyMCksXG4gICAgICAgICAgICAgICAgXCJzcGFjaW5nXCI6IFsxMCwgMTBdLFxuICAgICAgICAgICAgICAgIFwiZGF0YVNvdXJjZVwiOiAoJCAtPiAkZGF0YUZpZWxkcy5zYXZlR2FtZVNsb3RzKSwgXG4gICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRvclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aS5TYXZlR2FtZVNsb3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZXhlY3V0ZUZvcm11bGFzXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQgLT4gJHRlbXBGaWVsZHMuc2xvdCA9IG8ucGFyZW50LmluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY3JlYXRlQ29udHJvbFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZGl0aW9uc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcImZpZWxkXCI6ICgkIC0+ICRkYXRhRmllbGRzLnNhdmVHYW1lU2xvdHNbJHRlbXBGaWVsZHMuc2xvdF0/LmRhdGUpLCBcIm5vdEVxdWFsVG9cIjogKCQgLT4gJycpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcImZpZWxkXCI6ICgkIC0+ICRkYXRhRmllbGRzLnNldHRpbmdzLmNvbmZpcm1hdGlvbiksIFwiZXF1YWxUb1wiOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcImZpZWxkXCI6ICgkIC0+ICRkYXRhRmllbGRzLnRlbXBTZXR0aW5ncy5sb2FkTWVudUFjY2VzcyksIFwiZXF1YWxUb1wiOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1zXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdG9yXCI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJjb25maXJtYXRpb25EaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWkuQ29uZmlybWF0aW9uRGlhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiekluZGV4XCI6IDkwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHsgXCJsY0lkXCI6IFwiMkJEMDhDQzY1QjlBMjI0OEM3NDlCOUM0REVFQUFERThFMjBBXCIsIFwiZGVmYXVsdFRleHRcIjogXCJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gbG9hZD9cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRBY3Rpb25zXCI6IFt7IFwibmFtZVwiOiBcImxvYWRHYW1lXCIsIFwicGFyYW1zXCI6IHsgXCJzbG90XCI6ICgkIC0+ICR0ZW1wRmllbGRzLnNsb3QpIH0gfV0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWplY3RBY3Rpb25zXCI6IFt7XCJuYW1lXCI6XCJkaXNwb3NlQ29udHJvbFwiLFwicGFyYW1zXCI6KCQgLT4gJ2NvbmZpcm1hdGlvbkRpYWxvZycpfV19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJjb25kaXRpb25zXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJmaWVsZFwiOiAoJCAtPiAkZGF0YUZpZWxkcy5zYXZlR2FtZVNsb3RzWyR0ZW1wRmllbGRzLnNsb3RdPy5kYXRlKSwgXCJub3RFcXVhbFRvXCI6ICgkIC0+ICcnKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBcImZpZWxkXCI6ICgkIC0+ICEkZGF0YUZpZWxkcy5zZXR0aW5ncy5jb25maXJtYXRpb24gb3IgISRkYXRhRmllbGRzLnRlbXBTZXR0aW5ncy5sb2FkTWVudUFjY2VzcyksIFwiZXF1YWxUb1wiOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSwgXCJuYW1lXCI6IFwibG9hZEdhbWVcIiwgXCJwYXJhbXNcIjogeyBcInNsb3RcIjogKCQgLT4gJHRlbXBGaWVsZHMuc2xvdCkgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXVxufSJdfQ==
//# sourceURL=Layout_LoadMenu_86.js