output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_id" {
  value = aws_subnet.public.id
}

output "web_instance_ip" {
  value = aws_instance.web.public_ip
}

output "web_instance_public_dns" {
  value = aws_instance.web.public_dns
}
