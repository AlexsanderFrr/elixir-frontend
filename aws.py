import boto3

# Configurar o cliente S3
s3 = boto3.client('s3')
bucket_name = 'elixirnatural'

# Função para atualizar metadados de um objeto
def update_metadata(object_key):
    print(f"Atualizando {object_key} ...")
    copy_source = {'Bucket': bucket_name, 'Key': object_key}
    s3.copy_object(
        Bucket=bucket_name,
        CopySource=copy_source,
        Key=object_key,
        MetadataDirective='REPLACE',
        ContentDisposition='inline'  # Isso garante que a imagem será exibida no navegador
    )

# Listar todos os objetos no bucket
response = s3.list_objects_v2(Bucket=bucket_name, Prefix='imgsuco/')

# Verificar se há objetos na resposta
if 'Contents' in response:
    for obj in response['Contents']:
        object_key = obj['Key']
        update_metadata(object_key)

    # Paginação para obter todos os objetos
    while response.get('IsTruncated'):
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix='imgsuco/', ContinuationToken=response['NextContinuationToken'])
        if 'Contents' in response:
            for obj in response['Contents']:
                object_key = obj['Key']
                update_metadata(object_key)

print("Todos os objetos foram atualizados.")
